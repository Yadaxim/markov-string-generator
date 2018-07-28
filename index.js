var weightedSample = function(probability_hash) {
  var acc, prob, rand, total, value;
  total = 0;
  for (value in probability_hash) {
    prob = probability_hash[value];
    total += prob;
  }
  rand = Math.random() * total;
  acc = 0;
  for (value in probability_hash) {
    prob = probability_hash[value];
    acc += prob;
    if (acc > rand) {
      return value;
    }
  }
};


var normalizeCountHash = function(count_hash) {
  let normalized_count_hash = {}

  Object.keys(count_hash).forEach(function(kk){
    probability_hash = count_hash[kk]
    total = 0
    for (value in probability_hash) {
      prob = probability_hash[value];
      total += prob;
    }

    normalized_probaility_hash ={}
    Object.keys(probability_hash).forEach(function(k){
      normalized_probaility_hash[k] = probability_hash[k]/total
    })

    normalized_count_hash[kk] = normalized_probaility_hash

  })

  return normalized_count_hash

}

var mergeProbabilityHash = function(phs){
  let keys = new Set( phs.map(function(x){return Object.keys(x)}).reduce(function(a,b){return a.concat(b)}) )

  let newph = {}

  keys.forEach(function(k){
    newph[k] = phs.map(function(y){return y[k] || 0 }).reduce(function(a,b){return a+b}) / phs.length
  })
  return newph

}

var mergeCountHash = function(chs){
  let keys = new Set( chs.map(function(x){return Object.keys(x)}).reduce(function(a,b){return a.concat(b)}) )

  let newch = {}

  keys.forEach(function(k){
    newch[k] = mergeProbabilityHash( chs.map(function(y){return y[k]}).filter(function(z){return z}) )
  })

  return newch
}

var mergeGenerators = function(gs){
  let newg = new Generator(['aaa'])
  newg.count_hash = mergeCountHash(gs.map(function(x){return x.count_hash }))
  return newg
}



module.export = class Generator{
  constructor(chains){

    this.count_hash = {}

    chains.forEach((chain)=>{
      //console.log('each')
      //console.log(chain)
      this.addChain(chain)})


  }

  static mergeGenerators(generators){
    return mergeGenerators(generators)
  }

  showCountHash(){ console.log(this.count_hash)}

  resetCount(){ this.count_hash = {} }

  normalize(){ this.count_hash = normalizeCountHash(this.count_hash) ; return this}

  addChain(chain){

    let c1 = '¿'
    let c2 = '¿'
    let ch = this.count_hash

    chain = chain + '?'
    chain.split('').forEach((c)=>{
      if(ch[c1+c2]){
        if(ch[c1+c2][c]){
          ch[c1+c2][c] += 1
        }else{
          ch[c1+c2][c] = 1
        }

      }else{
        let h = {}
        h[c] = 1
        ch[c1+c2] = h
      }

      c1 = c2
      c2 = c

    })

  }

  randomChain(){
    let chain = ''
    let c1 = '¿'
    let c2 = '¿'
    let count = 0

    while(c2 != '?' & count < 20){
      let next = weightedSample(this.count_hash[c1+c2])
      if( next != '?'){ chain += next}
      c1 = c2
      c2 = next
      count += 1
    }

    return chain

  }
}

// window.randomName = function(name_hash, min, max, starts_array) {};

// name = '';

// c1 = '¿';

// c2 = '¿';

// count = 0;

// starts = sample(starts_array);

// if (starts) {
//   starts = starts.toLowerCase();
//   if (max <= starts.length) {
//     return starts.slice(0, +max + 1 || 9e9);
//   }
//   name = starts;
//   c2 = ('¿¿' + starts).split('')[starts.length + 1];
//   c1 = ('¿¿' + starts).split('')[starts.length];
// }

// if (!name_hash[c1 + c2]) {
//   return false;
// }

// while (c2 !== '?' && count < 20) {
//   next = weightedSample(name_hash[c1 + c2]);
//   if (next !== '?') {
//     name += next;
//   }
//   c1 = c2;
//   c2 = next;
//   count += 1;
// }

// if (name.length > max || name.length < min) {
//   return randomName(name_hash, min, max, starts_array);
// }

// return name.toLowerCase().capita
