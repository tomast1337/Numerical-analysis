function I = trapezoidal_rule(f, a, b, n)
    % Composite Trapezoidal Rule
    % f: function handle
    % a, b: integration bounds
    % n: number of subintervals

    h = (b - a) / n;
    x = a:h:b;
    y = f(x);

    I = h * (0.5*y(1) + sum(y(2:end-1)) + 0.5*y(end));
end
