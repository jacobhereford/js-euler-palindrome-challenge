'use strict';

module.exports = () => {
  return true;
};


I learned to how to google euler palindrome question 36 and copy and paste :)

/** Given half a palindrome, construct the rest of the palindrome with
 * an optional string inserted in the middle. The returned string is
 * only guaranteed to be a palindrome if 'mid' is empty or a palindrome. */
public static String getPalindrome(String bin_part, String mid) {
    return bin_part + mid + (new StringBuilder(bin_part)).reverse();
}

/** Check if the specified string is a palindrome. */
public static boolean isPalindrome(String p) {
    for (int i=0; i<p.length()/2; i++)
        if (p.charAt(i) != p.charAt(p.length()-1-i))
            return false;
    return true;
}

public static void main(String[] args) {

    String[] mids = {"0","1"};
    long total = 0;
    boolean longDone = false; // have the numbers with extra digits been tested

    long start = System.currentTimeMillis();
    for (long i=0; i<1000; i++) {
        String bin_part = Long.toBinaryString(i);

        String bin = getPalindrome(bin_part, "");
        long dec = Long.valueOf(bin, 2);
        if (dec >= 1000000) break; // totally done

        if (isPalindrome(Long.toString(dec)))
            total += dec;

        if (!longDone) {
            for (int m=0; m<mids.length; m++)  {
                bin = getPalindrome(bin_part, mids[m]);
                dec = Long.valueOf(bin, 2);
                if (dec >= 1000000) {
                    longDone = true;
                    break;
                }
                if (isPalindrome(Long.toString(dec)))
                    total += dec;
            }
        }
    }
    long end = System.currentTimeMillis();
    System.out.println("Total: " + total + " in " + (end-start) + " ms");
}





public long total = 0;
public long max_value = 1000000;
public long runtime = -1;

public static boolean isPalindrome(String s) {
    for (int i=0; i<s.length()/2; i++)
        if (s.charAt(i) != s.charAt(s.length()-1-i))
            return false;
    return true;
}

public void gen(String bin, boolean done) {
    if (done) { // generated a valid binary number
        // check current value and add to total if possible
        long val = Long.valueOf(bin, 2);
        if (val >= max_value)
            return;
        if (isPalindrome(Long.toString(val))) {
            total += val;
        }

        // generate next value
        gen('1' + bin + '1', true);
        gen('0' + bin + '0', false);
    } else { // generated invalid binary number (contains leading and trailing zero)
        if (Long.valueOf('1' + bin + '1', 2) < max_value) {
            gen('1' + bin + '1', true);
            gen('0' + bin + '0', false);
        }
    }
}

public void start() {
    total = 0;
    runtime = -1;
    long start = System.currentTimeMillis();
    gen("",false);
    gen("1",true);
    gen("0",false);
    long end = System.currentTimeMillis();
    runtime = end - start;
}

public static void main(String[] args) {
    Palindromes2 p = new Palindromes2();
    p.start();
    System.out.println("Total: " + p.total + " in " + p.runtime + " ms.");
}
