calc={
    getVal:() => {
        return document.getElementById("inputvalues").value;
    },
    setVal:(v) => {
        document.getElementById("inputvalues").value=v;
    },
    addDigit:(digit) => {
        calc.setVal(calc.getVal()+digit);
    },
    addOperation:(operation) => {
        if( calc.getVal().length && (calc.getVal().split(" ")).length==1 ){
            calc.setVal(calc.getVal()+" "+operation+" ");
        }
    },
    clean:() => {
        calc.setVal("");
    }
};
