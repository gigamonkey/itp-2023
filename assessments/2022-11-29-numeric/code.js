const totalEggs = (hard, soft) => {
  return hard + soft;
};

const chocolatesPerPerson = (chocolates, people) => {
  return Math.floor(chocolates / people);
};

const extraChocolates = (chocolates, people) => {
  return chocolates % people;
};