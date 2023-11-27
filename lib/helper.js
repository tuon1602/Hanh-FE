export function formatToVN(x){
    if(x){
        return x.toLocaleString('vi', {style : 'currency', currency : 'VND'});
    }
}