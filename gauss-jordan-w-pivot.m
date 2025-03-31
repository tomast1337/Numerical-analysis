function x = gauss_jordan_pivot(A, b)
    % GAUSS_JORDAN_PIVOT Solves linear system Ax = b using Gauss-Jordan elimination with partial pivoting
    % Input:
    %   A - coefficient matrix (n x n)
    %   b - right-hand side vector (n x 1)
    % Output:
    %   x - solution vector
    
    [n, m] = size(A);
    
    % Check that A is square
    if n ~= m
        error('Matrix A must be square');
    end
    
    % Check that A and b have compatible sizes
    if n ~= length(b)
        error('Matrix A and vector b have incompatible sizes');
    end
    
    % Make copies to avoid modifying inputs
    A = A;
    b = b;
    
    for i = 1:n
        % Partial pivoting
        [~, maxindex] = max(abs(A(i:n, i)));
        maxindex = maxindex + i - 1;
        
        if A(maxindex, i) == 0
            error('Matrix is singular');
        end
        
        % Swap rows if needed
        if maxindex ~= i
            A([i maxindex], :) = A([maxindex i], :);
            b([i maxindex]) = b([maxindex i]);
        end
        
        % Store pivot before scaling
        pivot = A(i, i);
        
        % Scale current row
        A(i, :) = A(i, :) / pivot;
        b(i) = b(i) / pivot;
        
        % Display current state
        fprintf('Step %d:\n', i);
        disp('A =');
        disp(A);
        disp('b =');
        disp(b);
        
        % Elimination
        for j = 1:n
            if j ~= i
                factor = A(j, i);
                b(j) = b(j) - factor * b(i);
                A(j, :) = A(j, :) - factor * A(i, :);
            end
        end
    end
    
    x = b;
end

