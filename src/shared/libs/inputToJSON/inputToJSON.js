const formatRows = (data) => {
  let samples = []
  data.slice(1).map((entry) => {
    let newObj = {}
    for(let i = 0; i < entry.length; i++) {
      newObj[data[0][i]] = entry[i]
    }
    samples.push(newObj)
  })
  return samples
}

const generateTrackType = (samples) => {
  let typeConvert = {
    'bigBed': 'bigBed',
    'bb': 'bigBed',
    'bed': 'bigBed',
    'bigWig': 'bigWig',
    'wig': 'bigWig',
    'bw': 'bigWig',
    'vcfTabix': 'vcfTabix',
    'bam': 'bam'
  }
  for (let i = 0; i < samples.length; i++){
    let extension = samples[i]["URL"].split(".").pop()
    if (typeConvert[extension]) {
      samples[i]["trackType"] = typeConvert[extension]
    }
  }
  return samples
}

export const inputToJSON = (data) => {
  data["samples"] = formatRows(data["samples"])
  data["samples"] = generateTrackType(data["samples"])
  data = JSON.stringify(data, null, 2)
  return data
}


