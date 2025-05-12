f = @(x) sin(x);
a = 0;
b = pi;
n = 10;

I_trap = trapezoidal_rule(f, a, b, n);
I_simp = simpsons_rule(f, a, b, n);

fprintf('Trapezoidal Rule: %.8f\n', I_trap);
fprintf('Simpson''s Rule : %.8f\n', I_simp);
