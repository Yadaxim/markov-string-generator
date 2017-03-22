# markov-string-generator

a simple random string generator based en second order markov chains.

Usage:


chains = [ 'gataca', 'gtgtagta', 'gtcgctgcta' ]

generator = new Generator(names)

console.log('names', names)

console.log(generator)

console.log(generator.randomChain())
console.log(generator.randomChain())
console.log(generator.randomChain())
console.log(generator.randomChain())
console.log(generator.randomChain())
