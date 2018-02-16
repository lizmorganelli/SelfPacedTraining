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
public class MainComparator {
    public static void main(String[] args) {
        
        Comparator<Person> cmpAge = (p1, p2) -> p2.getAge() - p1.getAge();
        Comparator<Person> cmpFirstName = (p1, p2) -> p1.getFirstName().compareTo(p2.getFirstName());
        Comparator<Person> cmpLastName = (p1, p2) -> p1.getLastName().compareTo(p2.getLastName());
        
        //can also right functions to use above and get the comparators below
        Function<Person, Integer> f1 = p -> p.getAge();
        Function<Person, String> f2 = p -> p.getFirstName();
        Function<Person, String> f3 = p -> p.getLastName();
        
        //Comparators using functions
        //need to write the following in the Comparator interface(comparing)
//        Comparator<Person> cmpPerson = Comparator.comparing(f1);
        //could have f1 or p -> p.getAge();
//        Comparator<Person> cmpPerson = Comparator.comparing(p -> p.getAge());
        //above can also be written as
        Comparator<Person> cmpPersonAge = Comparator.comparing(Person::getAge);
        Comparator<Person> cmpPersonLastName = Comparator.comparing(Person::getLastName);
        
        Comparator<Person> cmp = cmpPersonAge.thenComparing(cmpPersonLastName);
    }
}
