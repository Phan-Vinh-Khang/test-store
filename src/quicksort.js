/*
#include <bits/stdc++.h>
#define ll long long
using namespace std;
int patition(vector<int> &v,int l,int r){
    int pivot=v[r];
    int i=l-1;
    for (int j=l;j<r;j++){
        if(v[j]<=pivot){
            i++;
            swap(v[j],v[i]);
        }
    }
    i++; //lúc này i đang nằm ở sớ cuối của dãy số < pivot,i+1 sẽ sang số đầu của dãy số  > pivot
    swap(v[i],v[r]);
    return i;
}
void quicksort(vector<int> &v,int l,int r){
    if(l>=r) return;
    // sẽ có function dc call với l=2 và r=3
    // sau khi return p sẽ là 2 hoac 3
    // nếu p=2 function quicksort(v,l,p-1) dc call đầu tiên l=2 và r=1, l>r
    // nếu p=3 function quicksort(v,p+1,r) dc call thứ 2 l=4 và r=3, l>r
    
    int p=patition(v,l,r);
    quicksort(v,l,p-1);
    quicksort(v,p+1,r);
    
    // khi call sẽ chạy function đầu tiên đến khi function đầu tiên dc return,
    // sẽ chạy tiếp function bên dưới function vừa dc return;
    
}
int main(){
    int n;
    cin>>n;
    vector<int> v(n);
    for (int i=0;i<n;i++){
        v[i]=rand()%1000000;
        if(v[i]%3==0) v[i]-=(v[i]*2);
    }
    quicksort(v,0,n-1);
    for (auto i:v){
        cout<<i<<" ";
    }
    return 0;
}
*/