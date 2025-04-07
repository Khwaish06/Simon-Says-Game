document.addEventListener("DOMContentLoaded", function () {
    let gameseq = [];
    let userseq = [];
    let started = false;
    let level = 0;
    let btns = ["first", "second", "third", "fourth"];

    const heading2 = document.querySelector("#heading2");

    console.log("Script Loaded. Waiting for key press...");

    if (!heading2) {
        console.error("Error: Could not find #heading2 element!");
        return;
    }

    // Start game on key press
    document.addEventListener("keydown", function () {
        if (!started) {
            started = true;
            heading2.innerText = `Game has started`;
            levelup();
        }
    });

    function btnFlash(btn) {
        if (!btn) return;
        btn.classList.add("flash");
        setTimeout(() => {
            btn.classList.remove("flash");
        }, 300);
    }

    function userFlash(btn) {
        if (!btn) return;
        btn.classList.add("userflash");
        setTimeout(() => {
            btn.classList.remove("userflash");
        }, 300);
    }

    function levelup() {
        userseq = [];
        level++;
        heading2.innerText = `Level ${level}`;

        let randomIdx = Math.floor(Math.random() * 4);
        let randcol = btns[randomIdx];
        gameseq.push(randcol);
        let randbtn = document.querySelector(`#${randcol}`);

        btnFlash(randbtn);
    }

    function check(idx) {
        if (userseq[idx] === gameseq[idx]) {
            if (userseq.length === gameseq.length) {
                setTimeout(levelup, 1000);
            }
            console.log("Same color");
        } else {
            heading2.innerText = `Game Over! Your score is ${level-1}. Press a key to start again.`;
            document.querySelector("body").style.backgroundColor = "red";
            setTimeout(() => {
                document.querySelector("body").style.backgroundColor = "white";
            }, 500);
            restartGame();
        }
    }

    function btnpress() {
        let btn = this;
        userFlash(btn);
        let usercolor = btn.getAttribute("id");
        userseq.push(usercolor);
        check(userseq.length - 1);
    }

    let allbtns = document.querySelectorAll("#container div");
    allbtns.forEach(btn => btn.addEventListener("click", btnpress));

    function restartGame() {
        started = false;
        gameseq = [];
        userseq = [];
        level = 0;
    }
});
