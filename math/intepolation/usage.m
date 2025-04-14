x = [0, 1, 2];
y = [1, 3, 2];

f1 = lagrange_interpolation(x, y);
f2 = newton_interpolation(x, y);
f3 = general_polynomial_fit(x, y);

t = 1.5;
disp(['Lagrange: ', num2str(f1(t))]);
disp(['Newton: ', num2str(f2(t))]);
disp(['General Fit: ', num2str(f3(t))]);