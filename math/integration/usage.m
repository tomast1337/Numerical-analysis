f = @(x) sin(x);
a = 0;
b = pi;
n = 10;

I_trap = trapezoidal_rule(f, a, b, n);
I_simp = simpsons_rule(f, a, b, n);

fprintf('Trapezoidal Rule: %.8f\n', I_trap);
fprintf('Simpson''s Rule : %.8f\n', I_simp);


%
f = @(x) exp(x);

a = 0
b = 1
h = (b-a) / 4

x = flip(a:h:b)
y = f(x)

ISimpson = h/3 * (y(1) + 4 * sum(y(2:2:end-1)) + 2 * sum(y(3:2:end-2)) + y(end));
ITrapzoid = h * 0.5 * (y(1) + 2*sum(y(2:end-1)) + y(end));
I = quad(f,a,b)

% Display differences
disp(['Erro no metodo de Simpson: ', num2str(abs(I - ISimpson))])
disp(['Error no metodo do Trapezio: ', num2str(abs(I - ITrapzoid))])

%
