import {partial, pipe} from './utils'

const add = (a, b) => a + b
const addThree = (a, b, c) => a + b + c
const inc = (a) => a + 1
const dbl = (a) => a * 2
	
test('partial applies the first argument ahead of time', () => {
	const inc = partial(add, 1)

	const result = inc(2)

	expect(result).toBe(3);
})

test('partial applies the multiple argument ahead of time', () => {
	const inc = partial(addThree, 1, 3)

	const result = inc(2)

	expect(result).toBe(6);
})

test('pipe passed the results of inc to dbl', () => {
	const pipeline = pipe(inc, dbl)

	const result = pipeline(2)

	expect(result).toBe(6)
})


test('pipe passed the results of dbl to inc', () => {
	const pipeline = pipe(dbl, inc)

	const result = pipeline(2)

	expect(result).toBe(5)
})

test('pipe works with more than two functions', () => {
	const pipeline = pipe(add, inc, dbl, inc)

	const result = pipeline(1, 2)

	expect(result).toBe(9)
})