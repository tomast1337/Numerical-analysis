function I = simpsons_rule(f, a, b, n)
% Composite Simpson's Rule
% f: function handle, e.g., @(x) sin(x)
% a, b: integration limits
% n: number of subintervals (must be even)

    if mod(n, 2) ~= 0
        error('n must be even for Simpson''s rule');
    end

    h = (b - a) / n;
    x = a:h:b;
    y = f(x);

    I = h/3 * (y(1) + ...
            4 * sum(y(2:2:end-1)) + ...
            2 * sum(y(3:2:end-2)) + ...
            y(end));
end
