import numpy as np
import matplotlib.pyplot as plt
from scipy.integrate import quad, simpson, trapezoid


# Funções
def f(x):
    return x**2


def g(x):
    return np.sqrt(4 - x**2)


# Intervalo de integração
a = -1
b = 1


# Diferença entre as funções
def area_function(x):
    return g(x) - f(x)


# 1. Área exata (integral definida)
area_exact, _ = quad(area_function, a, b)

# 2. Área aproximada com o método dos trapézios (5 pontos)
x_trap = np.linspace(a, b, 5)
y_trap = area_function(x_trap)
area_trapezoid = trapezoid(y_trap, x_trap)

# 3. Área aproximada com o método de Simpson (5 pontos = 4 subintervalos)
x_simp = np.linspace(a, b, 5)
y_simp = area_function(x_simp)
area_simpson = simpson(y_simp, x_simp)

# Exibir resultados
print(f"Área exata (integral):         {area_exact:.6f}")
print(f"Área aprox. Trapézios (5 pts): {area_trapezoid:.6f}")
print(f"Área aprox. Simpson (5 pts):   {area_simpson:.6f}")

# Plot para visualização
x_vals = np.linspace(a, b, 400)
plt.fill_between(
    x_vals, g(x_vals), f(x_vals), color="lightblue", label="Área entre as curvas"
)
plt.plot(x_vals, g(x_vals), label="g(x)", color="red")
plt.plot(x_vals, f(x_vals), label="f(x)", color="blue")
plt.title("Área entre g(x) e f(x)")
plt.legend()
plt.grid(True)
plt.xlabel("x")
plt.ylabel("y")
plt.show()
import numpy as np
import matplotlib.pyplot as plt
from scipy.integrate import quad, simpson, trapezoid


# Funções
def f(x):
    return x**2


def g(x):
    return np.sqrt(4 - x**2)


# Intervalo de integração
a = -1
b = 1


# Diferença entre as funções
def area_function(x):
    return g(x) - f(x)


# 1. Área exata (integral definida)
area_exact, _ = quad(area_function, a, b)

# 2. Área aproximada com o método dos trapézios (5 pontos)
x_trap = np.linspace(a, b, 5)
y_trap = area_function(x_trap)
area_trapezoid = trapezoid(y_trap, x_trap)

# 3. Área aproximada com o método de Simpson (5 pontos = 4 subintervalos)
x_simp = np.linspace(a, b, 5)
y_simp = area_function(x_simp)
area_simpson = simpson(y_simp, x_simp)

# Exibir resultados
print(f"Área exata (integral):         {area_exact:.6f}")
print(f"Área aprox. Trapézios (5 pts): {area_trapezoid:.6f}")
print(f"Área aprox. Simpson (5 pts):   {area_simpson:.6f}")

# Plot para visualização
x_vals = np.linspace(a, b, 400)
plt.fill_between(
    x_vals, g(x_vals), f(x_vals), color="lightblue", label="Área entre as curvas"
)
plt.plot(x_vals, g(x_vals), label="g(x)", color="red")
plt.plot(x_vals, f(x_vals), label="f(x)", color="blue")
plt.title("Área entre g(x) e f(x)")
plt.legend()
plt.grid(True)
plt.xlabel("x")
plt.ylabel("y")
plt.show()
