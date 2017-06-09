# markov-string-generator

a simple random string generator based en second order markov chains.

## Install

npm install --save markov-string-generator

## Usage

Generator = require('markov-string-generator')

chains = [ 'gataca', 'gtgtagta', 'gtcgctgcta' ]

generator = new Generator(chains)

console.log(generator.randomChain())
'gtaca'

## Merge Generators

chains1 = ['gttgg','gttgtttgtgt', 'gttgtgggtgtt','gggt']
chains2 = ['ccssccsssscccc','cacacacaca', 'cacacacacccac']

generator1 = new Generator(chains1).normalize()
generator2 = new Generator(chains2).normalize()

generator = Generator.mergeGenerators([generator1, generator2])

## Show count hash

generator.showCountHash()


