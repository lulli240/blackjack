<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <title>Blackjack</title>
        <link href="https://fonts.googleapis.com/css?family=Lato:100,300,400" rel="stylesheet" type="text/css">
        <link href="/css/styles.css" rel="stylesheet" type="text/css">
        <script   src="https://code.jquery.com/jquery-3.1.0.js"   
                  integrity="sha256-slogkvB1K3VOkzAI8QITxV3VzpOnkeNVsKvtkYLMjfk="   
                  crossorigin="anonymous">
        </script>
        <script src="/js/script.js"></script>
    </head>
    <body>
        <div class="container">
            <div class="content">
                <div id="actions">
                    <button id="newDeal">New deal</button>
                    <button id="drawButton">Draw card</button>
                    <button id="stand-button">Stand</button>
                    <button id="devLogDeck">Log deck</button>
                    <button id="devRemoveHidden">Remove hidden</button>

                    <hr>

                    <div class="console"></div>
                </div>
                <div class="container-name">Dealer:</div>
                <div id="dealer-score" class="score"></div>
                <div id="dealer">
                    
                </div>
                <div class="container-name">You:</div>
                <div id="player-score" class="score"></div>
                <div id="player">
                    
                </div>
            </div>
        </div>
    </body>
</html>
