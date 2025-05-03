

# 16388
'''
s=open('16388.txt').read()

while 'KLMN' in s:
    s=s.replace('KLMN','z')

mx=0
for i in range(len(s)-2):
    st=''
    ind=i
    if s[i]=='L' and s[i+1]=='M' and s[i+2]=='N':
        st='LMN'
        ind=i+2
    if s[i]=='M' and s[i+1]=='N':
        st='MN'
        ind=i+1
    if s[i]=='N':
        st='N'
        ind=i
    if s[i]=='z':
        st='z'
        ind=i
    if st!='':
        for j in range(ind+1,len(s)-2):
            if s[j]=='z':
                st+=s[j]
            else:
                if s[j]=='K':
                    st+=s[j]
                    if s[j+1]=='L':
                        st+=s[j+1]
                        if s[j+2]=='M':
                            st+=s[j+2]
                break
        ln=len(st)+s.count('z')*3
        if ln>mx:
            mx=ln
print(mx)
'''                        

'''
f=open('19489.txt').read()

n = len(f)
max_len = 0
left = 0
count_WWF = 0

i = 0
while i < n:

    if i - 2 >= left and f[i-2:i+1] == 'WWF':
        count_WWF += 1
    
    if i - 4 >= left and f[i-4:i+1] == 'WSFWW':
        left = i - 4 + 1
        count_WWF = 0
        for j in range(left, i+1):
            if j + 2 < n and f[j:j+3] == 'WWF':
                count_WWF += 1

    while count_WWF > 120:
        if left + 2 <= i and f[left:left+3] == 'WWF':
            count_WWF -= 1
        left += 1
    max_len = max(max_len, i - left + 1)
    i += 1

print(max_len)
(PRO100 ЕГЭ) Текстовый файл состоит из символов T, U, V, W, X, Y и Z.
Определите в прилагаемом файле минимальное количество идущих подряд символов (длину непрерывной подпоследовательности), среди которых символ X встречается не менее 500 раз, 
а символ Y не встречается совсем.
Для выполнения этого задания следует написать программу.'''

f=open('24_11954.txt').read()
i=0
mx=10**10
count=0
n=len(f)
l=0
while i<n:
    if f[i]=='X':
        count+=1
    if f[i]=='Y':
        l = i + 1
        count=0
        for g in range(l,i+1):
            if g<n and f[g]=='X':
                count+=1
    while count>500:
        if l<=i and f[l]=='X':
            count-=1
        l+=1
    ln = i-l+1
    if ln > 0:
        # print(f[l:i+1])
        s = f[l:i+1]
        if s.count('X') >=500:
            mx=min(mx,ln)    
    i+=1
print(mx)
























