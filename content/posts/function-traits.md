+++
title = 'Introspecting Functions at Compile Time in C++'
date = '2025-11-01T14:04:00Z'
tags = ["c++"]
+++

I wrote this simple `FunctionTraits` structure that allows you to inspect function types at compile time, that is, to look "inside" a function and discover what arguments it takes and what it returns.

Here's the full implementation:

```cpp
#include <type_traits>
#include <tuple>

template<typename, typename = std::void_t<>>
struct FunctionTraits {};

template<typename Return, typename ...Args>
struct FunctionTraits<Return (*)(Args...)> {
    using ReturnType = Return;
    using ArgTypes = std::tuple<Args...>;
};

template<typename Return, typename Class, typename ...Args>
struct FunctionTraits<Return (Class::*)(Args...)> {
    using ReturnType = Return;
    using ArgTypes = std::tuple<Args...>;
};

template<typename Return, typename Class, typename ...Args>
struct FunctionTraits<Return (Class::*)(Args...) const> {
    using ReturnType = Return;
    using ArgTypes = std::tuple<Args...>;
};

template<typename F>
struct FunctionTraits<F, std::void_t<decltype(&F::operator())>> {
    using ReturnType = typename FunctionTraits<decltype(&F::operator())>::ReturnType;
    using ArgTypes = typename FunctionTraits<decltype(&F::operator())>::ArgTypes;
};
```

## How It Works

Let’s break it down piece by piece.

### 1. The Default Case

```cpp
template<typename, typename = std::void_t<>>
struct FunctionTraits {};
```

This is the primary template. It matches anything by default but doesn't define anything inside.
It also sets up a *SFINAE-friendly* structure (`std::void_t`) so that the compiler can gracefully skip it when other specializations fit better.

### 2. Free Functions and Function Pointers

```cpp
template<typename Return, typename ...Args>
struct FunctionTraits<Return (*)(Args...)> {
    using ReturnType = Return;
    using ArgTypes = std::tuple<Args...>;
};
```

This specialization matches plain function pointers, such as:

```cpp
int foo(double, char);

using Traits = FunctionTraits<decltype(&foo)>;
```

Now you can do:

```cpp
using Return = Traits::ReturnType;  // int
using Args = Traits::ArgTypes;      // std::tuple<double, char>
```

### 3. Member Functions

Member functions are trickier because they’re tied to a class:

```cpp
template<typename Return, typename Class, typename ...Args>
struct FunctionTraits<Return (Class::*)(Args...)> {
    using ReturnType = Return;
    using ArgTypes = std::tuple<Args...>;
};
```

This handles non-const member functions such as:

```cpp
struct MyClass {
    void do_something(int, float);
};

using Traits = FunctionTraits<decltype(&MyClass::do_something)>;
// ReturnType = void, ArgTypes = std::tuple<int, float>
```

### 4. Const Member Functions

Some member functions are `const` (they don't modify the object).
We need a separate specialization for that:

```cpp
template<typename Return, typename Class, typename ...Args>
struct FunctionTraits<Return (Class::*)(Args...) const> {
    using ReturnType = Return;
    using ArgTypes = std::tuple<Args...>;
};
```

### 5. Lambdas and Functors

Here's where it gets interesting:

```cpp
template<typename F>
struct FunctionTraits<F, std::void_t<decltype(&F::operator())>> {
    using ReturnType = typename FunctionTraits<decltype(&F::operator())>::ReturnType;
    using ArgTypes = typename FunctionTraits<decltype(&F::operator())>::ArgTypes;
};
```

Every lambda or functor (a class with an overloaded `operator()`) has a callable operator that looks like a member function.  
This specialization detects it using `decltype(&F::operator())` and then recursively reuses the member function traits.

So this works:

```cpp
auto lambda = [](int x, double y) -> bool { return x < y; };

using Traits = FunctionTraits<decltype(lambda)>;
// Traits::ReturnType = bool
// Traits::ArgTypes = std::tuple<int, double>
```

## Putting It All Together

Let's see `FunctionTraits` in action:

```cpp
#include <iostream>

template <typename F>
void print_function_info(F&&) {
    using Traits = FunctionTraits<std::decay_t<F>>;
    std::cout << "Return type: " << typeid(typename Traits::ReturnType).name() << "\n";
    std::cout << "Number of args: " << std::tuple_size<typename Traits::ArgTypes>::value << "\n";
}

int test_func(int, double) { return 42; }

int main() {
    print_function_info(&test_func);
    print_function_info([](std::string, float) -> void {});
}
```

Possible output (compiler-dependent):

```
Return type: i
Number of args: 2
Return type: v
Number of args: 2
```

## Final Thoughts

`FunctionTraits` is a simple/compact yet powerful tool for used function introspection.  
With just a few template tricks, `std::void_t`, variadic templates, and recursive specialization, we have this structure that works on nearly any callable object.
