import { JacobiResult, PLUResult, Step } from ".";

export const EPSILON = 1e-8;

export const clone = (matrix: number[][]): number[][] =>
  matrix.map((row) => [...row]);

export const gaussJordanSteps = (matrix: number[][]): Step[] => {
  const steps: Step[] = [];
  const A = clone(matrix);
  const n = A.length;

  // Check matrix dimensions
  if (n === 0 || A.some((row) => row.length !== n + 1)) {
    throw new Error("Invalid matrix dimensions");
  }

  for (let i = 0; i < n; i++) {
    // Find pivot row with maximum absolute value in current column
    let maxRow = i;
    for (let j = i + 1; j < n; j++) {
      if (Math.abs(A[j][i]) > Math.abs(A[maxRow][i])) {
        maxRow = j;
      }
    }

    // Swap rows if needed
    if (maxRow !== i) {
      [A[i], A[maxRow]] = [A[maxRow], A[i]];
      steps.push({
        action: `Swap R${i + 1} with R${maxRow + 1}`,
        matrix: clone(A),
      });
    }

    // Check for singular matrix
    if (Math.abs(A[i][i]) < EPSILON) {
      steps.push({
        action: `Warning: Matrix may be singular (pivot < ${EPSILON})`,
        matrix: clone(A),
      });
      continue; // Skip to next row
    }

    // Normalize current row
    const pivot = A[i][i];
    for (let j = i; j < n + 1; j++) {
      A[i][j] /= pivot;
    }
    steps.push({
      action: `R${i + 1} → R${i + 1} ÷ ${pivot.toFixed(2)}`,
      matrix: clone(A),
    });

    // Eliminate other rows
    for (let k = 0; k < n; k++) {
      if (k !== i && Math.abs(A[k][i]) > EPSILON) {
        const factor = A[k][i];
        for (let j = i; j < n + 1; j++) {
          A[k][j] -= factor * A[i][j];
        }
        steps.push({
          action: `R${k + 1} → R${k + 1} - (${factor.toFixed(2)} × R${i + 1})`,
          matrix: clone(A),
        });
      }
    }
  }

  return steps;
};

export const pluDecomposition = (matrix: number[][]): PLUResult => {
  const n = matrix.length;
  const P = Array.from({ length: n }, (_, i) =>
    Array.from({ length: n }, (_, j) => (i === j ? 1 : 0))
  );
  const L = Array.from({ length: n }, () => Array(n).fill(0));
  const U = clone(matrix);
  const steps: Step[] = [];

  for (let i = 0; i < n; i++) {
    // Partial pivoting
    let maxRow = i;
    for (let j = i + 1; j < n; j++) {
      if (Math.abs(U[j][i]) > Math.abs(U[maxRow][i])) {
        maxRow = j;
      }
    }

    if (maxRow !== i) {
      // Swap rows in U
      [U[i], U[maxRow]] = [U[maxRow], U[i]];
      // Swap rows in P
      [P[i], P[maxRow]] = [P[maxRow], P[i]];
      // Swap rows in L (only for elements before i)
      for (let k = 0; k < i; k++) {
        [L[i][k], L[maxRow][k]] = [L[maxRow][k], L[i][k]];
      }
      steps.push({
        action: `Swapped row ${i + 1} with row ${maxRow + 1}`,
        matrix: clone(U),
      });
    }

    // Set diagonal of L to 1
    L[i][i] = 1;

    // Gaussian elimination
    for (let j = i + 1; j < n; j++) {
      const factor = U[j][i] / U[i][i];
      L[j][i] = factor;
      for (let k = i; k < n; k++) {
        U[j][k] -= factor * U[i][k];
      }
      steps.push({
        action: `Eliminated row ${j + 1} using row ${
          i + 1
        } (factor: ${factor.toFixed(2)})`,
        matrix: clone(U),
      });
    }
  }

  return { P, L, U, steps };
};
export const gaussJacobi = (
  A: number[][],
  b: number[],
  maxIterations = 50,
  tolerance = 1e-6
): JacobiResult => {
  const n = A.length;
  let x = Array(n).fill(0); // Initial guess (all zeros)
  const result: JacobiResult = { steps: [], solution: [] };

  for (let k = 0; k < maxIterations; k++) {
    const xNew = Array(n).fill(0);
    let maxError = 0;

    for (let i = 0; i < n; i++) {
      let sum = 0;
      for (let j = 0; j < n; j++) {
        if (j !== i) sum += A[i][j] * x[j];
      }
      xNew[i] = (b[i] - sum) / A[i][i];

      // Calculate relative error
      if (x[i] !== 0) {
        maxError = Math.max(maxError, Math.abs((xNew[i] - x[i]) / xNew[i]));
      }
    }

    result.steps.push({
      iteration: k + 1,
      x: [...xNew],
      error: k > 0 ? maxError : undefined, // No error for first iteration
    });

    // Check for convergence
    if (maxError < tolerance) {
      result.solution = xNew;
      return result;
    }

    x = xNew;
  }

  result.solution = x;
  return result;
};
