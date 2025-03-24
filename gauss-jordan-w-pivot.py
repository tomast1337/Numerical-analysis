import numpy as np
from rich import print

# gaus jordan with pivot
def gauss_jordan_pivot(A:np.array, B:np.array):
    n = len(B)
    # assert that A is square
    if A.shape[0] != A.shape[1]:
        raise ValueError("Matrix A must be square")
    # assert that A and B have compatible sizes
    if A.shape[0] != B.shape[0]:
        raise ValueError("Matrices A and B are incompatible")
    # augment A with B
    for i in range(n):
        # partial pivoting
        maxindex = abs(A[i:,i]).argmax() + i
        if A[maxindex, i] == 0:
            raise ValueError("Matrix is singular.")
        # swap rows
        if maxindex != i:
            A[[i,maxindex]] = A[[maxindex,i]]
            B[[i,maxindex]] = B[[maxindex,i]]
        # scale row
        A[i] = A[i] / A[i,i]
        B[i] = B[i] / A[i,i]
        # print current state of A and B
        print(f"Step {i}:")
        print("A =\n", A)
        print("B =\n", B)
        # elimination
        for j in range(n):
            if i != j:
                B[j] = B[j] - A[j,i] * B[i]
                A[j] = A[j] - A[j,i] * A[i]
    return B

# test
"""
x1 + x2 + x3 = 3
2x1 + -x2 + 3x3 = 4
5x1 + 3x2 - 6x3 = 2
"""
A = np.array([[1,1,1],
              [2,-1,3],
              [5,3,-6]])

B = np.array([3,4,2])

print("Solution 1:")
ans = gauss_jordan_pivot(A,B)
print("Solution:", ans)
print("Check:")
print("A @ ans =", A @ ans)
print("B =", B)

"""
x1 + x2 + x3 = 5
2x1 + -x2 + 3x3 = -1
5x1 + 3x2 - 6x3 = 3
"""

A = np.array([[1,1,1],
              [2,-1,3],
              [5,3,-6]])


B = np.array([5,-1,3])

print("Solution 2:")
ans = gauss_jordan_pivot(A,B)
print("Solution:", ans)
print("Check:")
print("A @ ans =", A @ ans)
print("B =", B)
