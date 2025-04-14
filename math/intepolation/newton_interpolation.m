function f = newton_interpolation(x, y)
    n = length(x);
    a = y;
    for j = 2:n
        for i = n:-1:j
            a(i) = (a(i) - a(i-1)) / (x(i) - x(i-j+1));
        end
    end
    f = @(t) newton_eval(t, x, a, n);
end

function val = newton_eval(t, x, a, n)
    val = a(n);
    for i = n-1:-1:1
        val = val * (t - x(i)) + a(i);
    end
end


%{
% Test the function
x = [0, 1, 2];
y = [1, 3, 2];
f = newton_interpolation(x, y);
t = 1.5;
disp(['Newton: ', num2str(f(t))]);
% Output: Newton: 2.25
}%