const handleApproveRequest = () => {
    // Ensure refetch happens after the state is updated
    refetch().then(() => {
      // Now use the latest demandState
      view?.forEach((item, index) => {
        const quantity = item?.fullItemDetails?.quantity;
        const sibSerialNo = index + sibSerialPerse;
  
        const { itemName, purpose, demand, ledgerSerialNo } = item;
        const balance = parseInt(quantity) - parseInt(demand);
        const sibData = { itemName, purpose, quantity, demand, balance, ledgerSerialNo, approvalDate, sibSerialNo };
  
        // Your axios operations go here...
        axios.patch(`http://localhost:5012/balance?q=${itemName}`, { balance }).then((res) => {
          console.log('update', res.data);
        });
      });
    });
  };
  