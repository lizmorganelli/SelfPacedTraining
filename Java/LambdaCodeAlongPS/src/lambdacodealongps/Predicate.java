/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package lambdacodealongps;

/**
 *
 * @author n0190184
 */
@FunctionalInterface
public interface Predicate<T> {
    
    public boolean test(T t);
    
    //this will create another abstract method so you need to create an implement inside the 
    //interface - has to be a default method
//    public Predicate<T> and(Predicate<T> other);
    
    public default Predicate<T> and(Predicate<T> other){
        return t -> test(t) && other.test(t);
    };
    
    public default Predicate<T> or(Predicate<T> other){
        return t -> test(t) || other.test(t);
    };
    
    //this is static because it is called in a static way - i.e. Predicate.isEqualTo
    //compare passed string to 
//    public static Predicate<String> isEqualTo(String string){
//        return s -> s.equals(string);
//    };
//    
    //can paramitize this instead of using a string... will give you the same results. 
    public static <U> Predicate<U> isEqualTo(U u){
        return s -> s.equals(u);
    };
}
