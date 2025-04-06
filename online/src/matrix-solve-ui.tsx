import { useState } from "react";
import { Button } from "@/components/ui/button";

const clone = (matrix: number[][]): number[][] => matrix.map((row) => [...row]);

type Step = {
  action: string;
  matrix: number[][];
};

const EPSILON = 1e-8; // For floating point comparisons

const gaussJordanSteps = (matrix: number[][]): Step[] => {
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

export const MatrixSolver = () => {
  const [matrixA, setMatrixA] = useState<number[][]>(
    Array.from({ length: 3 }, () => Array(3).fill(0))
  );
  const [vectorB, setVectorB] = useState<number[]>(Array(3).fill(0));
  const [steps, setSteps] = useState<Step[]>([]);

  const handleMatrixChange = (i: number, j: number, value: string) => {
    const newMatrix = matrixA.map((row) => [...row]);
    newMatrix[i][j] = parseFloat(value);
    setMatrixA(newMatrix);
  };

  const handleVectorChange = (i: number, value: string) => {
    const newVector = [...vectorB];
    newVector[i] = parseFloat(value);
    setVectorB(newVector);
  };

  const handleSolve = () => {
    const augmented = matrixA.map((row, i) => [...row, vectorB[i]]);
    const result = gaussJordanSteps(augmented);
    setSteps(result);
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Gauss-Jordan Solver</h1>

      <div className="space-y-4">
        <div className="space-y-2">
          <h2 className="font-semibold">Matrix A:</h2>
          {matrixA.map((row, i) => (
            <div key={i} className="flex space-x-2">
              {row.map((val, j) => (
                <input
                  key={j}
                  type="number"
                  className="w-16 p-1 border rounded"
                  value={val}
                  onChange={(e) => handleMatrixChange(i, j, e.target.value)}
                />
              ))}
            </div>
          ))}
        </div>

        <div className="space-y-2">
          <h2 className="font-semibold">Vector b:</h2>
          <div className="flex flex-col space-y-2">
            {vectorB.map((val, i) => (
              <input
                key={i}
                type="number"
                className="w-16 p-1 border rounded"
                value={val}
                onChange={(e) => handleVectorChange(i, e.target.value)}
              />
            ))}
          </div>
        </div>

        <Button onClick={handleSolve}>Solve</Button>
      </div>

      <div className="space-y-4">
        {steps.map((step, index) => (
          <div key={index} className="bg-gray-100 p-4 rounded-xl shadow">
            <div className="font-medium mb-2">
              Step {index + 1}: {step.action}
            </div>
            <pre className="font-mono">
              {step.matrix
                .map((row) =>
                  row.map((v) => v.toFixed(2).padStart(6)).join(" ")
                )
                .join("\n")}
            </pre>
          </div>
        ))}
      </div>
    </div>
  );
};
