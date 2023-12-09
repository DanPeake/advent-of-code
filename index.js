const runDay = (num) => {
    let dayName = 'day' + String(num).padStart(2, '0');
    require(`./${dayName}/${dayName}`).run();
};

runDay(9);