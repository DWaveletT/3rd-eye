---
create_time: 1586617347
update_time: 1586617347
title: 题解 P3797 【妖梦斩木棒】
board: 1
tag:
- 1
extension:
  problem:
    id: P3797
    type: P
    title: 妖梦斩木棒
    difficulty: 7.466
    submitted: true
    accepted: true
---
东方Project相关试题（Easy-Normal）[1 / 30]

本题是一个单点修改，区间求答案类型的题目，这种题一般都是用线段树来解决

所以主要需要考虑线段树上维护哪些信息，以及如何pushup

区间木棒段数 $val$ 是要求的东西，肯定要维护

而合并两个区间时，中间可能可以产生一段新的木棒

条件就是左边的区间有一个可用的左括号，并且它的右边都是 X，右边的区间有一个可用的右括号，它的左边都是 X

所以，考虑记录这个区间左边是否有可用括号 $pre$ ，右边是否有可用括号 $suf$

但是这样还是不能直接维护，因为可能会出现这种情况：

~~~
[(,X,X,X] 与 [X,X,X,X] 合并
~~~

一般来说，一个区间右边是否有可用括号，只由它的右子区间决定

但是在这个情况中，它的左子区间有可用括号，而且右子区间都是 X，使得这个区间右边仍然有可用括号

所以还要维护这个区间是否都为 X，$pure = 1$ 表示是，$pure = 0$ 表示不是

代码：

```cpp
#include <cstdio>
#define ls (rt << 1)
#define rs (rt << 1 | 1)
int n,m;

struct node{
	int val,pre,suf,pure;//val表示这个区间中间有多少个木棒,pure表示这个区间是否都是X 
}tree[200005 << 2];//pre表示这个区间左边是否是XXXXX),suf表示这个区间右边是否是(XXXX 

node Merge(node x,node y){
	node ans;
	ans.pre = x.pre;
	if(x.pure) ans.pre |= y.pre;
	ans.suf = y.suf;
	if(y.pure) ans.suf |= x.suf;
	ans.pure = x.pure & y.pure;
	if(x.suf && y.pre){
		ans.val = x.val + y.val + 1;
	}else{
		ans.val = x.val + y.val;
	}
	return ans;
}

void build(int rt,int l,int r){
	if(l == r){
		if(l == 1) tree[rt].suf = 1;
		else if(r == n) tree[rt].pre = 1;
		else tree[rt].pure = 1;
		return;
	}
	int mid = l + r >> 1;
	build(ls,l,mid);
	build(rs,mid+1,r);
	tree[rt] = Merge(tree[ls],tree[rs]);
}

void upload(int rt,int l,int r,int id,char C){
	if(l == r){
		tree[rt] = {0,0,0,0};
		if(C == '(') tree[rt].suf = 1;
		else if(C == ')') tree[rt].pre = 1;
		else tree[rt].pure = 1;
		return;
	}
	int mid = l + r >> 1;
	if(id <= mid){
		upload(ls,l,mid,id,C);
	}else{
		upload(rs,mid+1,r,id,C);
    }
	tree[rt] = Merge(tree[ls],tree[rs]);
}

node query(int rt,int l,int r,int L,int R){
	if(l == L && r == R){
		return tree[rt];
	}
	int mid = l + r >> 1;
	if(R <= mid){
		return query(ls,l,mid,L,R);
	}else if(L > mid){
		return query(rs,mid+1,r,L,R);
	}else{
		return Merge(query(ls,l,mid,L,mid),query(rs,mid+1,r,mid+1,R));
	}
}

int main(){
	scanf("%d%d",&n,&m);
	build(1,1,n); 
	int op;
	for(int i = 1;i <= m;i++){
		scanf("%d",&op);
		if(op == 1){
			int x;
			char c;
			scanf("%d %c",&x,&c);
			upload(1,1,n,x,c);
		}else{
			int l,r;
			scanf("%d%d",&l,&r);
		    node ans = query(1,1,n,l,r);
		    printf("%d\n",ans.val);
		}
	}
	return 0;
}
```
