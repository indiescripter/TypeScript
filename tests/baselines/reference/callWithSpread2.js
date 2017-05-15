//// [callWithSpread2.ts]
// Desired semantics: take type of array that is spread,
// allow it to be applied to a
// *trailing* set of optional parameters whose types match.
// Length is *not* checked, the parameters it's applied to just have to be optional.

// that means that tuples are non-starters because their array element type
// is a union like string | number.

// with exceptions for JS functions that use arguments, or maybe all JS functions

declare function all(a?: number, b?: number): void;
declare function weird(a?: number | string, b?: number | string): void;
declare function prefix(s: string, a?: number, b?: number): void;
declare function rest(s: string, a?: number, b?: number,  ...rest: number[]): void;
declare function normal(s: string): void;
declare function thunk(): string;

declare var ns: number[];
declare var mixed: (number | string)[];
declare var tuple: [number, string];

// good
all(...ns)
weird(...ns)
weird(...mixed)
weird(...tuple)
prefix("a", ...ns)
rest("d", ...ns)


// this covers the arguments case
normal("g", ...ns)
normal("h", ...mixed)
normal("i", ...tuple)
thunk(...ns)
thunk(...mixed)
thunk(...tuple)

// bad
all(...mixed)
all(...tuple)
prefix("b", ...mixed)
prefix("c", ...tuple)
rest("e", ...mixed)
rest("f", ...tuple)
prefix(...all) // required parameters are required
prefix(...mixed)
prefix(...tuple)


//// [callWithSpread2.js]
// Desired semantics: take type of array that is spread,
// allow it to be applied to a
// *trailing* set of optional parameters whose types match.
// Length is *not* checked, the parameters it's applied to just have to be optional.
// good
all.apply(void 0, ns);
weird.apply(void 0, ns);
weird.apply(void 0, mixed);
weird.apply(void 0, tuple);
prefix.apply(void 0, ["a"].concat(ns));
rest.apply(void 0, ["d"].concat(ns));
// this covers the arguments case
normal.apply(void 0, ["g"].concat(ns));
normal.apply(void 0, ["h"].concat(mixed));
normal.apply(void 0, ["i"].concat(tuple));
thunk.apply(void 0, ns);
thunk.apply(void 0, mixed);
thunk.apply(void 0, tuple);
// bad
all.apply(void 0, mixed);
all.apply(void 0, tuple);
prefix.apply(void 0, ["b"].concat(mixed));
prefix.apply(void 0, ["c"].concat(tuple));
rest.apply(void 0, ["e"].concat(mixed));
rest.apply(void 0, ["f"].concat(tuple));
prefix.apply(void 0, all); // required parameters are required
prefix.apply(void 0, mixed);
prefix.apply(void 0, tuple);
