function [x, iterations] = gauss_jacobi(A, b, x0, tol, max_iter)
    % Gauss-Jacobi Method Implementation with Step Printing
    % Inputs:
    %   A - Coefficient matrix (n x n)
    %   b - Right-hand side vector (n x 1)
    %   x0 - Initial guess (n x 1)
    %   tol - Tolerance for stopping criterion
    %   max_iter - Maximum number of iterations
    % Outputs:
    %   x - Solution vector
    %   iterations - Number of iterations performed
    
    n = length(b);
    x = x0;
    x_new = zeros(n, 1);
    
    fprintf('Starting Gauss-Jacobi Method\n');
    fprintf('Initial guess: '); disp(x0');
    fprintf('Tolerance: %e\n', tol);
    fprintf('Maximum iterations: %d\n\n', max_iter);
    
    for iterations = 1:max_iter
        fprintf('--- Iteration %d ---\n', iterations);
        
        for i = 1:n
            sigma = 0;
            for j = 1:n
                if j ~= i
                    sigma = sigma + A(i, j) * x(j);
                end
            end
            x_new(i) = (b(i) - sigma) / A(i, i);
            
            fprintf('x%d update: (b%d [%.4f] - sum [%.4f]) / A%d%d [%.4f] = %.6f\n', ...
                    i, i, b(i), sigma, i, i, A(i,i), x_new(i));
        end
        
        fprintf('\nNew approximation after iteration %d:\n', iterations);
        disp(x_new');
        
        % Check for convergence
        if norm(x_new - x, inf) < tol
            fprintf('\nConvergence achieved after %d iterations!\n', iterations);
            x = x_new;
            return;
        end
        
        x = x_new;
    end
    
    fprintf('\nMaximum iterations reached without convergence.\n');
end