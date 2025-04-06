import numpy as np

# from rich import print


def lu_decomposition(A):
    """
    Perform LU decomposition with partial pivoting.
    Returns:
        P: Permutation matrix
        L: Lower triangular matrix with unit diagonal
        U: Upper triangular matrix
    """
    n = A.shape[0]
    # Initialize matrices
    U = A.copy()
    L = np.eye(n)
    P = np.eye(n)

    for k in range(n - 1):
        # Partial pivoting
        pivot_row = np.argmax(np.abs(U[k:, k])) + k
        if pivot_row != k:
            # Swap rows in U
            U[[k, pivot_row], k:] = U[[pivot_row, k], k:]
            # Swap rows in L (only the already computed part)
            if k > 0:
                L[[k, pivot_row], :k] = L[[pivot_row, k], :k]
            # Record the permutation
            P[[k, pivot_row]] = P[[pivot_row, k]]

        if U[k, k] == 0:
            raise ValueError("Matrix is singular")

        # Compute multipliers and eliminate
        for i in range(k + 1, n):
            L[i, k] = U[i, k] / U[k, k]
            U[i, k:] -= L[i, k] * U[k, k:]

    return P, L, U


# Test the decomposition
def test_lu_decomposition():
    # Test matrix
    A = np.array([[2, -1, -2], [-4, 6, 3], [-4, -2, 8]], dtype=float)

    print("Original matrix A:")
    print(A)

    P, L, U = lu_decomposition(A)

    print("\nPermutation matrix P:")
    print(P)

    print("\nLower triangular matrix L:")
    print(L)

    print("\nUpper triangular matrix U:")
    print(U)

    # Verify the decomposition
    print("\nVerification (P*A should equal L*U):")
    print("P @ A:")
    print(P @ A)
    print("L @ U:")
    print(L @ U)

    # Another test case
    B = np.array([[1, 1, 1], [2, -1, 3], [5, 3, -6]], dtype=float)

    print("\n\nSecond test matrix B:")
    print(B)

    P, L, U = lu_decomposition(B)

    print("\nPermutation matrix P:")
    print(P)

    print("\nLower triangular matrix L:")
    print(L)

    print("\nUpper triangular matrix U:")
    print(U)

    print("\nVerification (P*B should equal L*U):")
    print("P @ B:")
    print(P @ B)
    print("L @ U:")
    print(L @ U)


if __name__ == "__main__":
    test_lu_decomposition()
