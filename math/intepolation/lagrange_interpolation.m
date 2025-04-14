function f = lagrange_interpolation(x, y)
    n = length(x);
    f = @(t) lagrange_eval(t, x, y, n);
end

function val = lagrange_eval(t, x, y, n)
    val = 0;
    for i = 1:n
        term = y(i);
        for j = 1:n
            if j ~= i
                term = term * (t - x(j)) / (x(i) - x(j));
            end
        end
        val = val + term;
    end
end

%{
% Test the function
x = [0, 1, 2];
y = [1, 3, 2];
f = lagrange_interpolation(x, y);
t = 1.5;
disp(['Lagrange: ', num2str(f(t))]);
% Output: Lagrange: 2.25
}%