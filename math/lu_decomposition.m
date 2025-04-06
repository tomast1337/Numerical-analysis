function [P, L, U] = lu_decomposition(A)
    % LU_DECOMPOSITION Perform LU decomposition with partial pivoting
    % Input:
    %   A - square matrix to decompose
    % Outputs:
    %   P - permutation matrix
    %   L - lower triangular matrix with unit diagonal
    %   U - upper triangular matrix
    
    [n, m] = size(A);
    
    % Check if matrix is square
    if n ~= m
        error('Input matrix must be square');
    end
    
    % Initialize matrices
    U = A;
    L = eye(n);
    P = eye(n);
    
    for k = 1:n-1
        % Partial pivoting - find row with maximum element in current column
        [~, pivot_row] = max(abs(U(k:n, k)));
        pivot_row = pivot_row + k - 1;  % Adjust index
        
        % Swap rows if necessary
        if pivot_row ~= k
            % Swap rows in U
            U([k, pivot_row], k:end) = U([pivot_row, k], k:end);
            
            % Swap rows in L (only the already computed part)
            if k > 1
                L([k, pivot_row], 1:k-1) = L([pivot_row, k], 1:k-1);
            end
            
            % Record the permutation
            P([k, pivot_row], :) = P([pivot_row, k], :);
        end
        
        % Check for singularity
        if abs(U(k, k)) < eps
            error('Matrix is singular or nearly singular');
        end
        
        % Compute multipliers and eliminate
        for i = k+1:n
            L(i, k) = U(i, k) / U(k, k);
            U(i, k:end) = U(i, k:end) - L(i, k) * U(k, k:end);
        end
    end
end

% Test function
function test_lu_decomposition()
    % Test matrix 1
    A = [2, -1, -2;
         -4, 6, 3;
         -4, -2, 8];
    
    disp('Original matrix A:');
    disp(A);
    
    [P, L, U] = lu_decomposition(A);
    
    disp('Permutation matrix P:');
    disp(P);
    
    disp('Lower triangular matrix L:');
    disp(L);
    
    disp('Upper triangular matrix U:');
    disp(U);
    
    % Verification
    disp('Verification (P*A should equal L*U):');
    disp('P*A:');
    disp(P*A);
    disp('L*U:');
    disp(L*U);
    
    % Test matrix 2
    B = [1, 1, 1;
         2, -1, 3;
         5, 3, -6];
    
    disp('Second test matrix B:');
    disp(B);
    
    [P, L, U] = lu_decomposition(B);
    
    disp('Permutation matrix P:');
    disp(P);
    
    disp('Lower triangular matrix L:');
    disp(L);
    
    disp('Upper triangular matrix U:');
    disp(U);
    
    disp('Verification (P*B should equal L*U):');
    disp('P*B:');
    disp(P*B);
    disp('L*U:');
    disp(L*U);
end

% Run the test
% test_lu_decomposition();