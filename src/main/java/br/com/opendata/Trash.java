package br.com.opendata;

import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;
import java.util.function.Consumer;

public class Trash {

	public static void main(String[] args) {
		List<Integer> linked = new LinkedList<Integer>();
		
		List<Integer> list = new ArrayList<Integer>();
		for (int i = 0; i < 10; i++)
			list.add(i);
		
		list.forEach(new Consumer<Integer>() {

			@Override
			public void accept(Integer t) {
					System.out.println(t);
				
			}
			
		});
	}
}
