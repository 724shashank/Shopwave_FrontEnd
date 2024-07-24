 const handleIncrement = (index) => {
    counters[index] += 1;
    setCounters(counters);
    updateCart(cart[index].product, counters[index]);
  };
  
  const handleDecrement = (index) => {
    if (counters[index] > 1) {
      counters[index] -= 1;
      setCounters(counters);
      updateCart(cart[index].product, counters[index]);
    }
  };