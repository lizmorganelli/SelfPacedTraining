/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package lambdacodealongps;

import java.util.function.Function;

/**
 *
 * @author n0190184
 */
@FunctionalInterface
public interface Comparator<T> {
    public int compare(T t1, T t2);
    
    
    public default Comparator<T> thenComparing(Comparator<T> cmp){
//        if compare p1 and p2 is equal to zero, then return the comparsion of the two options
//        using comp.comparator of p1 and p2 or the comparison of p1 p2 (fallback);
        return (p1, p2) -> compare(p1, p2) == 0 ? cmp.compare(p1, p2) : compare(p1, p2);
    };
    
    public default Comparator<T> thenComparing(Function<T, Comparable> f){
        Comparator<T> cmp = comparing(f);
        return thenComparing(cmp);
    };
    //need to use generics so we can accept Strings and Integers in the function
    //use Comparable
    
    //you can also use a comparator of U instead of Person
    public static <U> Comparator<U> comparing(Function<U, Comparable> f){
        //takes in two people and returns an int
        return (p1, p2) -> f.apply(p1).compareTo(f.apply(p2));
    }

    
  
}
