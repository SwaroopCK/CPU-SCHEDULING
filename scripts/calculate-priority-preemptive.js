function calculatePriorityPreemptive(){
    var nos = document.getElementById("no-of-processes").value;
    var arrivalTime = document.getElementById("arrival-time").value;
    var burstTime = document.getElementById("burst-time").value;
    var priority = document.getElementById("priority").value;
    
    var arrivalTimeStrArr = arrivalTime.split(",");
    var burstTimeStrArr = burstTime.split(",");
	var priorityStrArr = priority.split(",");

    var intNos = parseInt(nos);
    var intAT = new Array(intNos);
    var intBT = new Array(intNos);
	var intPRIORITY  = new Array(intNos);

    //Converting string array to int array
    var i = 0;
    for(var num of arrivalTimeStrArr){
        intAT[i] = parseInt(num);
        ++i;
    }
    
    //Converting string array to int array
    i = 0;
    for(var num of burstTimeStrArr){
        intBT[i] = parseInt(num);
        ++i;
    }
	i = 0;
    for(var num of priorityStrArr){
        intPRIORITY[i] = parseInt(num);
        ++i;
    }

	sortArrivalTime(intAT, intBT,intPRIORITY);
    priorityAlgorithm(intAT,intBT,intPRIORITY);
	
    function displayArr(arr){
        try{
            for(var i = 0; i < arr.length; ++i){
                document.write("<br> => " +arr[i]);
            }
        }catch(err){document.getElementById("tableRowId").innerHTML=err.message;}
    }

   function sortArrivalTime(at, bt, priority){
        var b,t,p;
        try{
            for(var i = 0; i < at.length;i++){
                for(var j=i+1;j<at.length;j++)
                    if(at[i]>at[j])
                    {
                        t=at[i];
                        b=bt[i];
                        p=priority[i];
                        at[i]=at[j];
                        bt[i]=bt[j];
                        priority[i]=priority[j];
                        at[j]=t;
                        bt[j]=b;
                        priority[j]=p;
                    }
                }
        }catch(err){document.getElementById("tableRowId").innerHTML=err.message;}
    }

	function getProcess(at, bt, tbt, priority, currenttime)
	{
        var i,min=9999,p1=-1;
        try{
            for(i=0;i<at.length;i++)
            {
                if(at[i]<=currenttime && tbt[i]!=0)
                {
                    if(priority[i]<min)
                    {
                        min=priority[i];
                        p1=i;
                    }
                }
            }
            return p1;
        }catch(err){document.getElementById("tableRowId").innerHTML=err.message;}
    }
    
    function priorityAlgorithm(at, bt, priority){
        var time = 0;
        var i = 0;
		var cnt=0;
		var nos=at.length;
        //----Array Declaration---
        var st = new Array(nos);
        var wt = new Array(nos);
        var ft = new Array(nos);
        var tat = new Array(nos);
		var tbt = new Array(nos);
		
		for(i=0;i<bt.length;i++)
			tbt[i]=bt[i];
		
		var currenttime=0;
		var currentprocess="",previousprocess="";
        //------------------------
        try{
            var totalTAT = 0.0;
            var totalWT = 0.0;
            var ganttChart = "";
            while(true){
                i=getProcess(at,bt,tbt,priority,currenttime);
                if(i==-1)
                {
                    currentprocess="idle";
                    if(currentprocess!="idle")
                    {
                        ganttChart+=currenttime+" | "+currenttime+" "+currentprocess;
                    }
                    previousprocess=currentprocess;
                    currenttime++;
                }
                else
                {
                    tbt[i]--;
                    st[i]=currenttime;
                    currentprocess="P"+i+" ";
                    if(currentprocess!=previousprocess)
                    {
                        ganttChart+=currenttime+" | "+currenttime+" "+currentprocess;
                    }
                    currenttime++;
                    if(tbt[i]==0){
                    ft[i]=currenttime;
                    tat[i]=ft[i]-at[i];
                    wt[i]=tat[i]-bt[i];
                    totalTAT+=tat[i];
                    totalWT+=wt[i];
                    cnt++;
                    }
                    previousprocess=currentprocess;
                    if(cnt==nos) break;
                }
            }
            ganttChart+=currenttime;
            i = 0;
            var tableData;
            var res="";
            for(i=0;i<at.length;i++){
                var tableData = "<tr>"+
                                    "<td>P"+i+"</td>"+
                                    "<td>"+at[i]+"</td>"+
                                    "<td>"+bt[i]+"</td>"+
                                    "<td>"+st[i]+"</td>"+
                                    "<td>"+ft[i]+"</td>"+
                                    "<td>"+wt[i]+"</td>"+
                                    "<td>"+tat[i]+"</td>"+
                                "</tr>";
                        res = res.concat(tableData);
                    }
                    document.querySelector('#tableRowId').innerHTML= res; 
            
                var timeData = "<table><tr>"+
                                "<td><b>Result:</b></td>"+
                            "</tr>"+
                            "<tr>"+
                                "<td><b>Total Waiting Time</b></td>"+
                                "<td>"+totalWT+"</td>"+
                            "</tr>"+
                            "<tr>"+
                                "<td><b>Total Turn Around Time</b></td>"+
                                "<td>"+totalTAT+"</td>"+
                            "</tr>"+
                            "<tr>"+
                                "<td><b>Average Waiting Time</b></td>"+
                                "<td>"+(totalWT/nos)+"</td>"+
                            "</tr>"+
                            "<tr>"+
                                "<td><b>Average Turn Around Time</b></td>"+
                                "<td>"+(totalTAT/nos)+"</td>"+
                            "</tr></table>";
                    document.querySelector('#output1').innerHTML=timeData;
            
            
            
            var ganttChartData = "<table><tr>"+
                                    "<td><b> Gantt Chart </b></td>"+
                                    "</tr>"+
                                    "<tr>"+
                                        "<td>"+ganttChart+"</td>"+
                                    "</tr></table>";
                document.querySelector('#output2').innerHTML=ganttChart;
        }catch(err){document.getElementById("tableRowId").innerHTML=err.message;}
    }
    document.getElementById("process-division").style.display = "block";  
}