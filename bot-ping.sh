#!/bin/bash
source /home/cooluqko/nodevenv/coolgameservice_bot_js/14/bin/activate && cd /home/cooluqko/coolgameservice_bot_js


if ps aux | grep "(/home/cooluqko/.pm2)" | grep -v "grep" > /dev/null; then
    pm2 kill
fi

npm start