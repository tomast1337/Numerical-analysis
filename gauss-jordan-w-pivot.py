import numpy as np

# from rich import print


def gauss_jordan_pivot(A: np.array, B: np.array):
    n = len(B)
    # Make copies to avoid modifying original arrays
    A = A.copy()
    B = B.copy()

    # assert that A is square
    if A.shape[0] != A.shape[1]:
        raise ValueError("Matrix A must be square")
    # assert that A and B have compatible sizes
    if A.shape[0] != B.shape[0]:
        raise ValueError("Matrices A and B are incompatible")

    # augment A with B
    for i in range(n):
        # partial pivoting
        maxindex = abs(A[i:, i]).argmax() + i
        if A[maxindex, i] == 0:
            raise ValueError("Matrix is singular.")
        # swap rows
        if maxindex != i:
            A[[i, maxindex]] = A[[maxindex, i]]
            B[[i, maxindex]] = B[[maxindex, i]]

        # Store the pivot element before scaling
        pivot = A[i, i]

        # scale row
        A[i] = A[i] / pivot
        B[i] = B[i] / pivot

        # Print the augmented matrix after scaling
        print(f"Step {i + 1}: Scaling row {i + 1}")
        augmented_matrix = np.hstack((A, B.reshape(-1, 1)))
        print(augmented_matrix)

        # elimination
        for j in range(n):
            if i != j:
                factor = A[j, i]
                B[j] = B[j] - factor * B[i]
                A[j] = A[j] - factor * A[i]

                # Print the augmented matrix after elimination
                print(f"Step {i + 1}.{j + 1}: Eliminating row {j + 1}")
                augmented_matrix = np.hstack((A, B.reshape(-1, 1)))
                print(augmented_matrix)

    return B

def test():
    # Test cases
    print("Solution 1:")
    A1 = np.array([[1, 1, 1], [2, -1, 3], [5, 3, -6]], dtype=float)
    B1 = np.array([3, 4, 2], dtype=float)

    ans1 = gauss_jordan_pivot(A1, B1)
    print("Solution:", ans1)
    print("Check:")
    print("A @ ans =", A1 @ ans1)
    print("B =", B1)

    print("\nSolution 2:")
    A2 = np.array([[1, 1, 1], [2, -1, 3], [5, 3, -6]], dtype=float)
    B2 = np.array([5, -1, 3], dtype=float)

    ans2 = gauss_jordan_pivot(A2, B2)
    print("Solution:", ans2)
    print("Check:")
    print("A @ ans =", A2 @ ans2)
    print("B =", B2)


if __name__ == "__main__":
    test()
