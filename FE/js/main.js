
        var Main = function () {
            return {
              init: function () {
                Main.connectWallet();
                $('.approve-wallet').off().on('click', function (e) {
                  Main.showLoading();
                  e.preventDefault();
                  approve().then(function () {
                    Main.hideLoading();
                    store.allowance = 10000000000000;
                    Main.updateUI();
                  });
                })

                $('.play-game').off().on('click', function ($event) {
                  var input = $(this).parent().find('input')
                  var lotNum = input.val()
                  if(lotNum < 0 || lotNum>99) return alert("Lottery number in range 0-99");
                  Main.showLoading();
                  playGame(lotNum).then(function () {
                    Main.hideLoading();
                    alert(lotNum + ": Your lottery number was sent successfully");
                    input.val('');
                  },function(err){
                    Main.hideLoading();
                    alert("Please tryagain later.");
                  })
                })
              },
              showLoading:function(){
                $('#preloader').show();
              },
              hideLoading:function(){
                $('#preloader').hide();
              },
              connectWallet: function (e) {
                $('.connect-wallet').off().on('click', function (e) {
                  e.preventDefault();
                  onConnect()
                })
              },
              updateUI: function () {
                if(store.accountData){
                  $('.connect-wallet').hide();
                  $('.log-out-btn').show();
                  $('.log-out-btn').html(ellipseAddress(store.accountData, 8));
                  if(store.allowance != 0){
                    $('.approve-wallet').hide();
                    $('.lot-section').show();
                    if(store.isGameStop){
                      $('.lot-section').html("<h3>The Lottery Game Ended..</h3>");
                      getWonUsers().then(function (result) {
                        // console.log("WON USERS",result);
                        if(result.length){
                          $('.lot-section').html(`<h3>The Lottery Game Ended..</h3><br><span style='color:red;'>${result.indexOf(store.accountData) >= 0 ? 'You are the Winner' : 'You are not a winer'}</span>`);
                        }else{
                          $('.lot-section').html(`<h3>The Lottery Game Ended..</h3><br><span style='color:red;'>There is no player who won the prize</span>`);
                        }
                      });
                    }
                  }else{
                    $('.approve-wallet').show();
                    $('.lot-section').hide();
                  }
                  $('#info').show();
                  $('#info').html(`<div> BNB Balance: ${store.balance}</div><div> BUSD Balance: ${store.busdBalance}</div>`)
                  Main.logOut();
                }else {
                  $('.connect-wallet').show();
                  $('.log-out-btn').hide();
                  $('.approve-wallet').hide();
                  $('#info').hide();
                  $('.lot-section').hide();
                }
                Main.hideLoading();
              },
              logOut: function () {
                $('.log-out-btn').off().on('click', function (e) {
                  let confirmBox = confirm("Are you sure you want to disconnect your wallet?");
                  if (confirmBox) {
                    e.preventDefault();
                    onLogout()
          
                    $('.connect-wallet').show();
                    $('.log-out-btn').hide();
                    $('.approve-wallet').hide();
                    $('.lot-section').hide();
                  
                  }
                })
              }
            }
          }();
    
        $(window).on('load', function() {
          $('#preloader').hide();
            Main.init();
        });

