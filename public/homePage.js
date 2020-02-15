'use strict';

const logoutButton = new LogoutButton();
logoutButton.action = () => ApiConnector.logout(response => {
  if (response.success) {
    location.reload();
  }
});

const showProfile = (responsedata) => {
  if (!responsedata)   {
    ApiConnector.current( response =>
      {
        if (response.success) {
          ProfileWidget.showProfile(response.data);
        }
      } );
    } else {
      ProfileWidget.showProfile(responsedata);
    }
  }
showProfile();


const updateStocks = () => {
  const rateBoard = new RatesBoard();
  ApiConnector.getStocks(response => {
    if (response.success) {
      rateBoard.clearTable();
      rateBoard.fillTable(response.data);
      console.log('updated');
    };
  });
}
updateStocks();
// setInterval(updateStocks, 5000);

const moneyManager = new MoneyManager();
moneyManager.addMoneyCallback = data => {
  ApiConnector.addMoney(data, response => {
    if (response.success) {
      showProfile(response.data);
      moneyManager.setMessage(false, 'Balance replenished successfully');
    } else {
      moneyManager.setMessage(true, response.data);
    }
    console.log(response);
  } );
}

moneyManager.conversionMoneyCallback = data => {
  ApiConnector.convertMoney(data, response => {
    if (response.success) {
      showProfile(response.data);
      moneyManager.setMessage(false, 'Money conversed successfully');
    } else {
      moneyManager.setMessage(true, response.data);
    }
  } );
}

moneyManager.sendMoneyCallback = data => {
  ApiConnector.transferMoney(data, response => {
    if (response.success) {
      showProfile(response.data);
      moneyManager.setMessage(false, 'Money sent successfully');
    } else {
      moneyManager.setMessage(true, response.data);
    }
  } );
}

const favoritesWidget = new FavoritesWidget();

const updateFavorites = data => {
  favoritesWidget.clearTable();
  favoritesWidget.fillTable(data);
  moneyManager.updateUsersList(data);
}

ApiConnector.getFavorites(response => {
  if (response.success) {
    updateFavorites(response.data);
  }
});

favoritesWidget.addUserCallback = data => {
  ApiConnector.addUserToFavorites(data, response => {
    if (response.success) {
      updateFavorites(response.data);
      moneyManager.setMessage(false, 'User added successfully');
    } else {
      moneyManager.setMessage(true, response.data);
    }
  });
};

favoritesWidget.removeUserCallback = data => {
  ApiConnector.removeUserFromFavorites(data, response => {
    if (response.success) {
      updateFavorites(response.data);
      moneyManager.setMessage(false, 'User removed successfully');
    } else {
      moneyManager.setMessage(true, response.data);
    }
  });
};
