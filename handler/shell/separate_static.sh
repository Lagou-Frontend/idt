#!/bin/bash
#######useage##############
##bash separate_static.sh 处理的目录 保留的文件
##for example:
## bash separate_static.sh /tmp/mobile .js  保留/tmp/mobile目录下的.js文件
## bash separate_static.sh /tmp/mobile ".jpg|.png"  保留/tmp/mobile目录下的.jpg和.png文件,如果保留多个后缀结尾的文件请用|符号分隔即可

filedir=$1
filetype=$2
if echo "$filetype"|grep "\|">/dev/null 2>&1;then
	filetype=`echo $filetype|awk -F"|" '{a="";for(i=1;i<=NF;i++)
	{
	    if(i==NF){
		a=a""$i"$"
	    }
	    else{
		a=a""$i"$|"
	    }
	}
            print a
	}'`
else
	filetype="$filetype""$"
fi

filelists=`find $filedir -type f|egrep -v "$filetype|.svn|.git"|xargs`

for i in $filelists
do
    rm -rf $i
done
