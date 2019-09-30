employees = [
  { name: 'Vera', salary: 500 },
  { name: 'Chuck', salary: 200 },
  { name: 'Dave', salary: 850 },
]

const total = employees.reduce((acc, item) => acc + item.salary, 0);
console.log(total / employees.length);
