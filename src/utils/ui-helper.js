export function scrollTo(element,to,duration){
    //duration 为当前元素移动到to目标所需要的时间, pertick被分为了三十份，每10ms运动一份，总共运动300ms到达目标。
     if(duration<=0) return;
     var difference=to-element.scrollTop;
     var pertick=difference/duration*10;//相当于300ms 乘1/10
     setTimeout(()=>{
        element.scrollTop=element.scrollTop+pertick;
        if(element.scrollTop===to){
            return;
        }
        scrollTo(element,to,duration-10);// 已移动一次，减掉一次的移动次数，在下一次的scrollTop已经减掉一次
     },10);
}