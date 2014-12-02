#!/bin/bash
#######useage##############
##bash delete_empty.sh 处理的目录 保留的文件
##for example:
## bash delete_empty.sh target

target=$1

while :

    do
        filelists=`find $target -type d -empty | egrep -v ".svn|.git" | xargs`
        # echo $filelists
        for i in $filelists
            do 
                rm -rf $i
            done
        if [ -z "$filelists" ];then
            exit 0
        fi

done