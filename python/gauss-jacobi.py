import numpy as np


def is_diagonally_dominant(A):
    """
    Check if matrix A is strictly diagonally dominant.
    Returns True if |A[i,i]| > Σ|A[i,j]| for all i, j≠i
    """
    n = len(A)
    for i in range(n):
        row_sum = np.sum(np.abs(A[i, :])) - np.abs(A[i, i])
        if np.abs(A[i, i]) <= row_sum:
            return False
    return True


def gauss_jacobi_with_checks(A, b, max_iterations=100, tolerance=1e-10):
    """
    Solve Ax = b using Gauss-Jacobi method with:
    1. Diagonal dominance check
    2. Detailed step printing
    """
    # Input validation
    n = len(A)
    if A.shape != (n, n):
        raise ValueError("Matrix A must be square")
    if len(b) != n:
        raise ValueError("Vector b must match matrix dimensions")

    print("\n=== Checking diagonal dominance ===")
    if is_diagonally_dominant(A):
        print("✓ Matrix is strictly diagonally dominant - convergence guaranteed")
    else:
        print(
            "⚠ Warning: Matrix is not strictly diagonally dominant - convergence not guaranteed"
        )

    print("\n=== Starting Gauss-Jacobi Method ===")
    x = np.zeros_like(b, dtype=np.float64)
    x_new = np.zeros_like(x)

    print("\nInitial guess: x =", x)
    print("\nStarting iterations...\n")

    for iteration in range(max_iterations):
        print(f"\n--- Iteration {iteration + 1} ---")

        for i in range(n):
            # Calculate sum of other terms
            sigma = np.dot(A[i, :i], x[:i]) + np.dot(A[i, i + 1 :], x[i + 1 :])

            # Store previous value for error calculation
            prev = x_new[i] if iteration > 0 else 0

            # Calculate new value
            x_new[i] = (b[i] - sigma) / A[i, i]

            # Print detailed calculation
            print(f"\nx_{i+1}:")
            print(f"  = (b_{i+1} - [sum of A_{i+1}*x_k for k≠{i+1}]) / A_{i+1}{i+1}")
            print(f"  = ({b[i]:.4f} - {sigma:.4f}) / {A[i,i]:.4f}")
            print(f"  = {x_new[i]:.8f}")

            if iteration > 0:
                change = x_new[i] - prev
                print(f"  Change from previous: {change:+.4e}")

        error = np.linalg.norm(x_new - x)
        print(f"\nSolution after iteration {iteration + 1}:")
        print(np.array_str(x_new, precision=8))
        print(f"Error (L2 norm): {error:.4e}")

        if error < tolerance:
            print(f"\n✔ Converged after {iteration + 1} iterations!")
            break

        x = x_new.copy()

    if iteration == max_iterations - 1:
        print(f"\n⚠ Maximum iterations reached without convergence")

    return x_new, iteration + 1


# Example usage
if __name__ == "__main__":
    # Example system (diagonally dominant):
    A = np.array([[10, 2, 1], [2, 20, -2], [-2, 3, 10]], dtype=np.float64)
    b = np.array([9, -44, 22], dtype=np.float64)

    print("Solving system:")
    print("A =")
    print(A)
    print("\nb =", b)

    try:
        x, iterations = gauss_jacobi_with_checks(A, b)

        print("\n=== Final Results ===")
        print("Solution vector x:")
        print(x)
        print(f"\nVerification (A*x should ≈ b):")
        print(f"Calculated: {np.dot(A, x)}")
        print(f"Target:     {b}")
        print(f"Difference: {np.dot(A, x) - b}")

    except ValueError as e:
        print(f"\nError: {e}")
