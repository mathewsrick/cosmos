(function () {
    'use strict';
  
    const currency = exports;
  
    currency.mask = function (value, decimals = 0, separators = null) {
        let _decimals = decimals > 0 ? parseInt(decimals, 0) : 2;
        separators = separators || ['.', '.', ','];

        //se dividen los decimales (si los tiene), de la parte entera
        value = value.toString().split(separators[2]);
        var number = value[0];
    
        //Se eliminan los separadores de miles y de millones introducidas por el usuario
        number = number.replace(separators[0], '');
        number = number.replace(separators[1], '');
        number = number.replace(separators[2], '');
    
        if(value[1] != NaN && (parseInt(value[1])+1) > 1) {
            //si el número ya venia con decimales se le pegan y los conserva
            number = parseFloat(number+'.'+value[1]).toFixed(_decimals);
        }else {
            //Se le asignan la cantidad de decimales al número ej: 12225.00
            number = (parseFloat(number) || 0).toFixed(_decimals);
        }
    
        // Si el número es menor a 4 cifras le pego los decimales y lo devuelvo
        if (number.length <= (4 + _decimals)) {
            return number.replace('.', separators[separators.length - 1]);
        }
        // console.log(number);
        //se divide la parte entera y la parte decimal de la cifra
        let parts = null;
        if(separators[2] == '.') {
            parts = number.split(/[-.]/);
        } else if(separators[2] == ',') {
            parts = number.split(/[-.]/);
        }
        //se conserva solo la parte entera que esta en la posición 0 del array 'parts'
        value = parts[parts.length > 1 ? parts.length - 2 : 0];
        //Se toma los últimos 3 números de la cifra y se le pegan los decimales con el separador correspondiente
        var result = value.substr(value.length - 3, 3) + (parts.length > 1 ?
            separators[separators.length - 1] + parts[parts.length - 1] : '');
        var start = value.length - 6;
        //se usa para el indice de la unidad de millones y de miles
        var undm = 0;
        //se van tomando de 3 en 3 los números de derecha a izquierda y se van concatenando en result
        while (start > -3) {
            result = (start > 0 ? value.substr(start, 3) : value.substr(0, 3 + start))
                + separators[undm] + result;
            undm = (++undm) % 2;
            start -= 3;
        }
        /* Si el número que recibe desde el input es negativo parts tendra tamaño 3
            * por lo que se le debe concatenar el signo '-' y luego la cifra
            */
        let mask = (parts.length == 3 ? '-' : '') + result;
    
        if(decimals == 0) {
            mask = mask.split(separators[2])[0];
        }
    
        return mask;
    };

    currency.unmask = function(value, withDecimals = true) {
        let unmaskedString = value.toString();
        let count = unmaskedString.length;
        let separators = [];
        let unmask = null;

        // looping reverse any character of the amount to get the separators
        for (let index = count-1; index > 0; index--) {
            if(isNaN(unmaskedString[index])) {
                if(unmaskedString[index] === '.' || unmaskedString[index] === ',') {
                    separators.push(unmaskedString[index]);
                }
            }                
        }
        
        // avoid to do this if the amount is a integer with no separators
        if(separators.length > 0) {
            let isDistintc = false;
            // checking if the first separator who is the last one is different 
            // to another to preserve it as separator for decimals
            for (let index = 1; index < separators.length; index++) {
                if(separators[0] != separators[index]) {
                    isDistintc = true;
                }        
            }
            
            if(isDistintc) {
                let amounts = value.split(separators[0]);
                let decimals = amounts[1];

                unmask = amounts[0].split(separators[1]).join('');                
                unmask = [unmask,decimals].join(separators[0]);
            } else {
                unmask = value.split(separators[0]).join('');
            }
        } else {
            unmask = value;
        }

        return withDecimals? unmask : parseInt(unmask);
    };
}());