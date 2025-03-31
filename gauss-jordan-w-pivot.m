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

function test_gauss_jordan_pivot()
    % TEST_GAUSS_JORDAN_PIVOT Test suite for gauss_jordan_pivot function
    
    fprintf('=== Testing gauss_jordan_pivot ===\n\n');
    
    % Test 1: Simple 2x2 system
    fprintf('Test 1: Simple 2x2 system\n');
    A1 = [2 1; 1 1];
    b1 = [3; 2];
    expected1 = [1; 1];
    run_test_case(A1, b1, expected1, 1);
    
    % Test 2: 3x3 system with partial pivoting needed
    fprintf('\nTest 2: 3x3 system requiring partial pivoting\n');
    A2 = [0 1 1; 1 1 1; 2 3 5];
    b2 = [4; 5; 16];
    expected2 = [1; 2; 2];
    run_test_case(A2, b2, expected2, 2);
    
    % Test 3: System with exact solution
    fprintf('\nTest 3: System with exact solution\n');
    A3 = [4 -1 1; 2 5 2; 1 2 4];
    b3 = [8; 3; 11];
    expected3 = [1; -1; 3];
    run_test_case(A3, b3, expected3, 3);
    
    % Test 4: Random system (verify Ax = b)
    fprintf('\nTest 4: Random system\n');
    rng(42); % Set seed for reproducibility
    n = 4;
    A4 = randn(n);
    x_expected4 = randn(n,1);
    b4 = A4 * x_expected4;
    run_test_case(A4, b4, x_expected4, 4);
    
    % Test 5: Singular matrix (should error)
    fprintf('\nTest 5: Singular matrix (should error)\n');
    A5 = [1 2 3; 4 5 6; 7 8 9];
    b5 = [1; 2; 3];
    try
        x5 = gauss_jordan_pivot(A5, b5);
        fprintf('Unexpected success - test failed!\n');
    catch ME
        fprintf('Expected error caught: %s\n', ME.message);
    end
    
    fprintf('\n=== Testing complete ===\n');
end