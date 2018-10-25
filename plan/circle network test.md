d3에서 원을 그려본다.

연도에 맞춰 원을 그릴 수 있도록 한다.
배열의 index 수만큼 원을 그리고

작은 값이 작은 원을 그릴 수 있도록 한다.

노드(원)를 찍는다.


.class-name (클래스)를 붙이면 새롭게 데이터를 같은 태그로
붙일 수 있다.


----

031-229-4018 안진수




-----
{
    thesis-name: 'zzz',
    year: 1995,
    cluster: 1,
    reference: '',
    parent-similarity: 0,
    sibling-similarity: 0
}
// 자식들
{
    thesis-name: 'aaa',
    year: 1998,
    cluster: 1,
    reference: 'zzz',
    parent-similarity: 1,
    sibling-similarity: 1
},
{
    thesis-name: 'bbb',
    year: 1999,
    cluster: 1,
    reference: 'zzz',
    parent-similarity: 1
    sibling-similarity: 0.9
},
{
    thesis-name: 'ccc',
    year: 1997,
    cluster: 1,
    reference: 'zzz',
    parent-similarity: 0.5
    sibling-similarity: 0
},

부모의 유사도는 선의 굵기,
각 sibiling 들의 유사도 각도가 유사한 정도,


similarity 는 sibling 끼리의 유사성을 체크한다?

데이터를 어떻게 정제를 해야 하는가?




clusters = {
    blue: 0,
    green: Math.PI
}






