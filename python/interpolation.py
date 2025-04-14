import numpy as np


def lagrange_interpolation(x_points, y_points):
    def lagrange_poly(x):
        total = 0
        n = len(x_points)
        for i in range(n):
            xi, yi = x_points[i], y_points[i]
            term = yi
            for j in range(n):
                if i != j:
                    term *= (x - x_points[j]) / (xi - x_points[j])
            total += term
        return total

    return lagrange_poly


def newton_interpolation(x_points, y_points):
    n = len(x_points)
    coef = np.copy(y_points).astype(float)

    # Divided differences table
    for j in range(1, n):
        coef[j:n] = (coef[j:n] - coef[j - 1 : n - 1]) / (
            x_points[j:n] - x_points[0 : n - j]
        )

    def newton_poly(x):
        result = coef[0]
        term = 1.0
        for i in range(1, n):
            term *= x - x_points[i - 1]
            result += coef[i] * term
        return result

    return newton_poly


def general_polynomial_fit(x_points, y_points):
    coeffs = np.polyfit(x_points, y_points, deg=len(x_points) - 1)
    poly = np.poly1d(coeffs)
    return poly


if __name__ == "__main__":
    x_vals = [0, 1, 2]
    y_vals = [1, 3, 2]

    lagrange_fn = lagrange_interpolation(x_vals, y_vals)
    newton_fn = newton_interpolation(x_vals, y_vals)
    general_fn = general_polynomial_fit(x_vals, y_vals)

    x_test = 1.5
    print("Lagrange:", lagrange_fn(x_test))
    print("Newton:", newton_fn(x_test))
    print("General Fit:", general_fn(x_test))
