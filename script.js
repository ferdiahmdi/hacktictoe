//========== ambil data resultHistory dari sessionStorage
// output: array of object
// apabila belum ada game maka akan mereturn array kosong []
// struktur array of object output:
/*
[
  { 
    players: ['playerA', 'playerB'],
    result: 'playerA', <-- ini berarti playerA pemenang
  }, 
  {
    players: ['playerA', 'playerB'],
    result: 'draw', <-- ini berarti draw
  },
  {
    players: ['playerA', 'playerB'],
    result: 'playerB', <-- ini berarti playerB pemenang
  },
]
*/
function getResultHistory() {
  const resultHistory =
    JSON.parse(sessionStorage.getItem("resultHistory")) || [];

  return resultHistory;
}

console.log(getResultHistory());
