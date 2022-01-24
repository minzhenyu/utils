/*
 * @Author: zy.min
 * @Date: 2022-01-24 14:05:10
 * @LastEditTime: 2022-01-24 14:35:48
 * @LastEditors: zy.min
 */
// 冒泡排序
 const sortArr = arr=>{
        for(let i = 0;i<arr.length-1;i++){
                for(let j=0; j<arr.length-1-i;j++){
                    if(arr[j]>arr[j+1]){
                            let temp = arr[j]
                            arr[j]=arr[j+1]
                            arr[j]=temp
                    }
                }
        }
        return arr
 }
 //快速排序
 const qucikSort =arr=>{
        if(arr.length<=1){
                return arr
        }
        let left = [],right =[],current = arr.splice(0,1)
        for(let i =0; i<arr.length; i++){
                if(arr[i]<current){
                        left.push(arr[i])
                }else{
                        right.push(arr[i])
                }
        }
        return qucikSort(left).concat(current,qucikSort(right))
 }

 //快速排序2
function quickSort2(arr,l,r){
        if(l < r){
            var i = l, j = r, x = arr[i];
            while(i<j){
                while(i<j && arr[j]>x)
                    j--;
                if(i<j)
                    //这里用i++，被换过来的必然比x小，赋值后直接让i自加，不用再比较，可以提高效率
                    arr[i++] = arr[j];
                while(i<j && arr[i]<x)
                    i++;
                if(i<j)
                    //这里用j--，被换过来的必然比x大，赋值后直接让j自减，不用再比较，可以提高效率
                    arr[j--] = arr[i];
            }
            arr[i] = x;
            quickSort2(arr, l, i-1);
            quickSort2(arr, i+1, r);
        }
    }



//     二路归并排序 left,right都是有序数组
// 将两个按值有序序列合并成一个按值有序序列，则称之为二路归并排序
// 交叉对比放入新数组

 
const marge=(left,right)=>{
	var result=[];
	il=0;
	ir=0;
	while(il<left.length && ir<right.length){
		if(left[il]<right[ir]){
			result.push(left[il++]);
		}else{
			result.push(right[ir++]);
		}
	}
	while(left[il]){
		result.push(left[il++]);
	}
	while(right[ir]){
		result.push(right[ir++]);
	}
	return result;
}

 export {
    sortArr,
    qucikSort,
    quickSort2,
    marge
 }