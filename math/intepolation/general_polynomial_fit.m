function f = general_polynomial_fit(x, y)
    coeffs = polyfit(x, y, length(x)-1);
    f = @(t) polyval(coeffs, t);
end

%{
% Test the function
x = [0, 1, 2];
y = [1, 3, 2];
f = general_polynomial_fit(x, y);
t = 1.5;
disp(['General Fit: ', num2str(f(t))]);
% Output: General Fit: 2.25
}%